const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
   date:{
    type: Date,   
    required: false,
    default: () => new Date()
   },
  title: {
    type: String,   
    required: true,
    trim: true,
    minlength: 3,   
    maxlength: 250,
  },
  slug: {
    type: String,
    required: false,
    unique: false,
    sparse: true,
    trim: true,
  },
    content: {
    type: String,
    required: true,
    minlength: 10,
  },

  image: {
    type: String,
    required: false,
    default: null,
  },
  description: {
    type: String,
    required: false,
    default: null,
  },

  author: {
    type: String,
    required: false,
    default: null,
  },

  status: {
    type: String,
    enum: Object.values(BlogStatus),
    default: BlogStatus.DRAFT,
    },
}, { timestamps: true });

// BlogSchema.post('save', async function (doc) {
//     try {
//         await upsertMeiliDocument('blogs', {
//             id: doc._id.toString(),
//             title: doc.title,
//             content: doc.content,
//             status: doc.status,
//             createdAt: doc.createdAt,
//             updatedAt: doc.updatedAt,
//         });
//     }
//     catch (error) {
//         console.error('Error indexing blog in MeiliSearch:', error);
//     }   
// });

// BlogSchema.post('findOneAndUpdate', async function (doc) {
//     try {
//         if (!doc) return;
//         await upsertMeiliDocument('blogs', {    
//             id: doc._id.toString(),
//             title: doc.title,
//             content: doc.content,
//             status: doc.status,
//             createdAt: doc.createdAt,
//             updatedAt: doc.updatedAt,
//         });
//     }
//     catch (error) {
//         console.error('Error updating blog in MeiliSearch:', error);
//     }   
// });
// BlogSchema.post('findOneAndDelete', async function (doc) {
//     try {
//         if (!doc) return;
//         await deleteMeiliDocument('blogs', doc._id.toString());
//     }
//     catch (error) {
//         console.error('Error deleting blog from MeiliSearch:', error);
//     }
// });

const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;
