const Database = require("../db/config")


module.exports = {
    async create(req, res) {
        const db = await Database()
        const pass = req.body.password
        let roomId
        let isRoom = true
        while (isRoom) {
            /* criando 6 digitos randomicamente */
            for (let i = 0; i < 6; i++) {
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString()
            }

            /* verificar se a sala já existe */
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsExistIds.some(roomsExistId => roomsExistId === roomId)

            if (!isRoom) {
                /* inseri a sala no banco de dados */
                await db.run(`INSERT INTO rooms(
                    id,
                    pass
                ) VALUES(
                    ${parseInt(roomId)},
                    ${pass}
                )`)
            }
        }

        await db.close()

        return res.redirect(`/room/${roomId}`)
    },

    async open(req,res){
        const db = await Database()
        const roomId = req.params.room        
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        await db.close()
        
        let isNoQuestions

        if(questions.length ==0){
            if(questionsRead.length == 0){
                isNoQuestions = true
            }
        }
        

        return res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions })
    },

    async enter(req,res){
        const db = await Database()
        const roomId = req.body.roomId
        const rooms = await db.all(`SELECT * FROM rooms WHERE id = ${roomId}`)
        await db.close()

        let roomExists = true

        if(rooms.length == 0){
            roomExists = false
        }
        

        if(!roomExists){
            return res.render('passincorrect', {roomId: roomId, roomExists: roomExists})            
        } else {
            return res.redirect(`/room/${roomId}`)
        }

        
    },

}