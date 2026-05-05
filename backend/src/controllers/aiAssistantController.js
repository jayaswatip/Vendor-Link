import { processQuery } from '../services/aiAssistant.js';

/**
 * Query AI Assistant with vendor-related questions
 * Validates query input and handles errors appropriately
 */
export const queryAssistant = async (req, res, next) => {
  try {
    const { query } = req.body;
    
    // Validate query exists and is a string
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ 
        success: false, 
        message: 'Query is required and must be a string' 
      });
    }

    // Trim and validate query length
    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Query cannot be empty' 
      });
    }

    if (trimmedQuery.length > 1000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Query must not exceed 1000 characters' 
      });
    }

    console.log(`[AI Assistant] Processing query: "${trimmedQuery.substring(0, 50)}..."`);
    const result = await processQuery(trimmedQuery);
    
    res.json({ 
      success: true, 
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};
