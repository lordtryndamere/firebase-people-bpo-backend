
async function createPoints(req, res, next){
    try {
        await req.pointsCollectionRef.doc("/" + req.body.id + "/").create({
            id: req.body.id,
            quantity: req.body.quantity,
            reason: req.body.reason
        })
        return res.status(200).json({success: true});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
}


async function getPoints(req, res, next){
    try {
        let querySnapshot = await req.pointsCollectionRef.where("id", "==", req.params.id).get();
        if(querySnapshot){
            let document = querySnapshot.docs[0];
            if (document){
                return res.status(200).json({success: true, data: document.data()});
            } else {
                return res.status(200).json({success: false, message: "Data not found"});
            }
        } else {
            return res.status(200).json({success: false, message: "Data not found"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
}

async function updatePoints(req, res, next){
    try {
        await req.pointsCollectionRef.doc(req.body.id).set({
            ...req.body.newData
        }, {merge: true});
        return res.status(200).json({success: true});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
}

async function deletePoints(req, res, next){
    try {
        await req.pointsCollectionRef.doc(req.params.id).delete();
        return res.status(200).json({success: true});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
}


module.exports = {
    createPoints,
    getPoints,
    updatePoints,
    deletePoints
}