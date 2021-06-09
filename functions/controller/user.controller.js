const mailConfig = require('../config/mail')
const FirebaseCollectionFatory = require("../factory/FirebaseCollectionFactory");
const bcryptjs = require("bcryptjs");


const collectionFactory = new FirebaseCollectionFatory("users");
const collectionRef = collectionFactory.getReference();

const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
async function createUser(req, res, next) {
    const salt = bcryptjs.genSaltSync(10);

    try {


        let userRecord = await admin
            .auth()
            .createUser({

                email: req.body.email,
                emailVerified: false,
                phoneNumber: '+573208046584',
                password: bcryptjs.hashSync(req.body.password, salt),
                displayName: 'Generic name',
                photoURL: 'http://www.example.com/12345678/photo.png',
                disabled: false,
            })

        let sendEmail = await admin
            .auth()
            .generateEmailVerificationLink(req.body.email)

        let transporter = nodemailer.createTransport({
            host: mailConfig.host,
            port: mailConfig.port,
            secure: mailConfig.secure,
            auth: {
                user: mailConfig.user,
                pass: mailConfig.password,
            },
        });
        let mailOptions = {
            from: mailConfig.host,
            to: req.body.email,
            subject: 'Email verification People bpo',
            text: `click here to verify your email ${sendEmail}`
        };

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log("Email sent successfully");
            }
        });



        return res.status(200).send({
            success: true,
            message: "User created succesfully!",
            user: userRecord
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

async function getUser(req, res, next) {
    try {
        let quierySnapshot = await collectionRef.where("id", "==", req.params.id).get();
        let document = quierySnapshot.docs[0];
        if (document) {
            let user = document.data();
            return res.status(200).json({ success: true, data: user });
        } else {
            return res.status(200).json({ success: false, message: "user does not exist" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

async function updateUser(req, res, next) {
    try {
        await collectionRef.doc(req.body.idToUpdate)
            .set({
                ...req.body.newData
            }, { merge: true });
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

async function deleteUser(req, res, next) {
    try {
        await collectionRef.doc(req.params.id).delete();
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}