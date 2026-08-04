/**
 * Search - Search indexing and query logic
 * 
 * This provides:
 * - Building search index from docs data
 * - Searching with relevance scoring
 * - Fuzzy matching
 * - Search suggestions
 */

const SearchEngine = {
    /**
     * Build search index from docs data
     */
    buildIndex(docsData) {
        var index = [];
        
        if (!docsData) {
            return index;
        }
        
        for (var sectionKey in docsData) {
            if (docsData.hasOwnProperty(sectionKey)) {
                var sectionData = docsData[sectionKey];
                var sectionName = sectionData.title || sectionKey;
                var pages = sectionData.pages || {};
                
                for (var pageKey in pages) {
                    if (pages.hasOwnProperty(pageKey)) {
                        var pageData = pages[pageKey];
                        var title = pageData.title || pageKey;
                        var content = pageData.content || '';
                        
                        // Extract plain text from content
                        var plainText = content.replace(/<[^>]*>/g, '');
                        
                        // Get excerpt (first 200 chars)
                        var excerpt = plainText.substring(0, 200) + '...';
                        
                        index.push({
                            id: sectionKey + '/' + pageKey,
                            title: title,
                            section: sectionName,
                            sectionSlug: sectionKey,
                            pageSlug: pageKey,
                            path: '/docs/' + sectionKey + '/' + pageKey,
                            excerpt: excerpt,
                            content: plainText,
                            // For relevance scoring
                            titleWords: this.tokenize(title),
                            contentWords: this.tokenize(plainText),
                            sectionWords: this.tokenize(sectionName),
                        });
                    }
                }
            }
        }
        
        return index;
    },
    
    /**
     * Tokenize text into words
     */
    tokenize(text) {
        if (!text) return [];
        return text.toLowerCase()
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .split(/\s+/)
            .filter(function(w) { return w.length > 1; });
    },
    
    /**
     * Search the index with a query
     */
    search(index, query, options) {
        if (!query || query.trim() === '') {
            return [];
        }
        
        var options = options || {};
        var maxResults = options.maxResults || 20;
        var fuzzyThreshold = options.fuzzyThreshold || 0.6;
        
        var queryTokens = this.tokenize(query);
        var results = [];
        
        for (var i = 0; i < index.length; i++) {
            var item = index[i];
            var score = this.calculateRelevance(item, queryTokens);
            
            if (score > 0) {
                results.push({
                    item: item,
                    score: score,
                });
            }
        }
        
        // Sort by score (highest first)
        results.sort(function(a, b) {
            return b.score - a.score;
        });
        
        // Return top results
        return results.slice(0, maxResults).map(function(r) {
            return r.item;
        });
    },
    
    /**
     * Calculate relevance score for a document
     */
    calculateRelevance(item, queryTokens) {
        var score = 0;
        
        for (var i = 0; i < queryTokens.length; i++) {
            var token = queryTokens[i];
            
            // Title match (highest weight)
            if (this.hasToken(item.titleWords, token)) {
                score += 10;
            }
            
            // Section match
            if (this.hasToken(item.sectionWords, token)) {
                score += 5;
            }
            
            // Content match
            if (this.hasToken(item.contentWords, token)) {
                score += 2;
            }
            
            // Fuzzy title match
            if (score === 0) {
                var fuzzyScore = this.fuzzyMatch(item.titleWords, token);
                if (fuzzyScore > 0.6) {
                    score += 8;
                }
            }
            
            // Fuzzy content match
            if (score === 0) {
                var fuzzyScore = this.fuzzyMatch(item.contentWords, token);
                if (fuzzyScore > 0.6) {
                    score += 1;
                }
            }
        }
        
        return score;
    },
    
    /**
     * Check if a token exists in a word list
     */
    hasToken(wordList, token) {
        for (var i = 0; i < wordList.length; i++) {
            if (wordList[i] === token) {
                return true;
            }
        }
        return false;
    },
    
    /**
     * Fuzzy match a token against a word list
     */
    fuzzyMatch(wordList, token) {
        var bestScore = 0;
        
        for (var i = 0; i < wordList.length; i++) {
            var word = wordList[i];
            var score = this.levenshteinSimilarity(token, word);
            if (score > bestScore) {
                bestScore = score;
            }
        }
        
        return bestScore;
    },
    
    /**
     * Calculate Levenshtein similarity between two strings
     */
    levenshteinSimilarity(a, b) {
        if (a.length === 0 && b.length === 0) return 1;
        if (a.length === 0 || b.length === 0) return 0;
        
        var distance = this.levenshteinDistance(a, b);
        var maxLength = Math.max(a.length, b.length);
        
        return 1 - (distance / maxLength);
    },
    
    /**
     * Calculate Levenshtein distance between two strings
     */
    levenshteinDistance(a, b) {
        var matrix = [];
        
        for (var i = 0; i <= a.length; i++) {
            matrix[i] = [i];
        }
        for (var j = 0; j <= b.length; j++) {
            matrix[0][j] = j;
        }
        
        for (var i = 1; i <= a.length; i++) {
            for (var j = 1; j <= b.length; j++) {
                var cost = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }
        
        return matrix[a.length][b.length];
    },
    
    /**
     * Get search suggestions for a query
     */
    getSuggestions(index, query) {
        if (!query || query.trim() === '') {
            return [];
        }
        
        var queryTokens = this.tokenize(query);
        var suggestions = [];
        
        for (var i = 0; i < index.length; i++) {
            var item = index[i];
            var title = item.title.toLowerCase();
            var section = item.section.toLowerCase();
            
            for (var j = 0; j < queryTokens.length; j++) {
                var token = queryTokens[j];
                
                if (title.indexOf(token) !== -1 || section.indexOf(token) !== -1) {
                    var suggestion = item.title + ' (' + item.section + ')';
                    suggestions.push(suggestion);
                    break;
                }
            }
        }
        
        // Limit suggestions
        return suggestions.slice(0, 5);
    },
    
    /**
     * Highlight search terms in text
     */
    highlightTerms(text, query) {
        if (!text || !query) return text;
        
        var tokens = this.tokenize(query);
        var highlighted = text;
        
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var regex = new RegExp('(' + token + ')', 'gi');
            highlighted = highlighted.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">$1</mark>');
        }
        
        return highlighted;
    }
};

// Make available globally
window.__TELOCE_SEARCH_ENGINE = SearchEngine;

// Export for use in other files
export { SearchEngine };