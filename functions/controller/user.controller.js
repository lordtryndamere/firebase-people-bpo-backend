const FirebaseCollectionFatory = require("../factory/FirebaseCollectionFactory");
const bcryptjs = require("bcryptjs");


const collectionFactory = new FirebaseCollectionFatory("users");
const collectionRef = collectionFactory.getReference();


async function createUser(req, res, next){
    const salt = bcryptjs.genSaltSync(10);
    try {
        await collectionRef
            .doc("/" + req.body.id + "/")
            .create({
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, salt)
            })
        return res.status(200).json({success: true});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
}

async function getUser(req, res, next){
    try {
        let quierySnapshot = await collectionRef.where("id", "==", req.params.id).get();
        let document = quierySnapshot.docs[0];
        if(document){
            let user = document.data();
            return res.status(200).json({success: true, data: user});
        } else {
            return res.status(200).json({success: false, message: "user does not exist"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
}

async function updateUser(req, res, next){
    try {
        await collectionRef.doc(req.body.idToUpdate)
            .set({
                ...req.body.newData
            }, {merge: true});
        return res.status(200).json({success: true});
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
}

async function deleteUser(req, res, next){
    try {
        await collectionRef.doc(req.params.id).delete();
        return res.status(200).json({success: true});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}