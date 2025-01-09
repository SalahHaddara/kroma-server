import mongoose from 'mongoose';

const designTokenHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    prompt: {
        type: String,
        required: true,
        minLength: 10
    },
    designTokens: {
        // Store the complete design token structure
        colors: [[String]],  // Array of color arrays
        typography: {
            fontFamily: String,
            sizes: {
                h1: Number,
                h2: Number,
                h3: Number,
                paragraph: Number,
                caption: Number
            }
        },
        buttons: mongoose.Schema.Types.Mixed,  // Store complex button configurations
        spacing: {
            micro: Number,
            xs: Number,
            sm: Number,
            base: Number,
            md: Number,
            lg: Number,
            xl: Number,
            xxl: Number
        },
        icons: mongoose.Schema.Types.Mixed,    // Store complex icon configurations
        quote: {
            styles: {
                backgroundColor: String,
                cornerRadius: String,
                padding: String
            },
            quoteSymbol: {
                color: String,
                fontSize: String
            },
            quote: {
                text: String,
                color: String,
                fontSize: String,
                fontWeight: String,
                letterSpacing: String
            },
            author: {
                name: String,
                color: String,
                fontSize: String,
                fontWeight: String,
                letterSpacing: String
            }
        },
        alerts: mongoose.Schema.Types.Mixed,   // Store complex alert configurations
        shadows: {
            sm: String,
            md: String,
            lg: String,
            xl: String
        },
        borderRadius: {
            sm: String,
            md: String,
            lg: String,
            xl: String,
            full: String
        }
    },
    inspirationImages: {
        mainImage: {
            imageData: String  // Base64 encoded image data
        },
        smallImage1: {
            imageData: String
        },
        smallImage2: {
            imageData: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const DesignTokenHistory = mongoose.model('DesignTokenHistory', designTokenHistorySchema);
export default DesignTokenHistory;