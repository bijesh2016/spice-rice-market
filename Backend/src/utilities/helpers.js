const { MeiliClient } = require("../config/config");
const fs=require("fs");
const deleteFile=async(filepath)=>{
    if(fs.existsSync(filepath)){
        return fs.unlinkSync(filepath)
    }
    return false
}

const randomStringGenerate=(length=100)=>{
    const chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const len=chars.length
    let randomStr="";
    for(let i=0;i<length;i++){

        const posn=Math.floor(Math.random()*(len-1))
        randomStr+=chars[posn]
    }
    return randomStr
}
//
// const upsertMeiliDocument = async (indexName, document) => {
//     try {
//         if (!document) return false;
//
//         // Handle both _id and id fields - Meilisearch requires 'id' field
//         const documentId = document.id || document._id;
//         if (!documentId) {
//             console.error("Meilisearch upsert error: Document missing both _id and id fields");
//             return false;
//         }
//
//         const index = MeiliClient.index(indexName);
//
//         // Remove _id if present (we'll use id instead), and ensure id is a string
//         const { _id, ...docWithoutId } = document;
//         await index.addDocuments([
//             {
//                 ...docWithoutId,
//                 id: documentId.toString(),
//             },
//         ]);
//
//         return true;
//     } catch (err) {
//         console.error("Meilisearch upsert error:", err.message);
//         return false;
//     }
// };
// const deleteMeiliDocument = async (indexName, documentId) => {
//     try {
//         if (!documentId) return false;
//
//         const index = MeiliClient.index(indexName);
//         await index.deleteDocument(documentId.toString());
//
//         return true;
//     } catch (err) {
//         console.error("Meilisearch delete error:", err.message);
//         return false;
//     }
// };
//
// const searchMeili = async (indexName, query, options = {}) => {
//     try {
//         const index = MeiliClient.index(indexName);
//         // console.log('Searching Meili:', { indexName, query, options });
//         const result = await index.search(query, options);
//         // console.log('Meili result:', result);
//         return result;
//     } catch (err) {
//         // console.error("Meilisearch search error:", err.message);
//         return { hits: [] };
//     }
// };

module.exports={
    deleteFile,
    randomStringGenerate,
    // upsertMeiliDocument,
    // deleteMeiliDocument,
    // searchMeili,
}






