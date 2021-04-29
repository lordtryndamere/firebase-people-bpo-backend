const admin = require("firebase-admin");

class FirebaseCollectionFatory{

    /**
     * @constructor
     * @param {string} collectionName collection name
     */
    constructor( collectionName ){
        this.db = admin.firestore();
        this.collectionReference = this.db.collection( collectionName );
        this.getReference = this.getReference.bind( this );
    }

    /**
     * 
     * @returns a firestore collection reference
     */
    getReference(){
        return this.collectionReference;
    }
}

module.exports = FirebaseCollectionFatory;