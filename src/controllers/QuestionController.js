const Database = require("../db/config")
module.exports = {
    async index(req, res) {
        const db = await Database()
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password
        let roomExists = true

        /* verificar se a senha esta correta  */
        // o Get traz apenas uma linha
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

        if(verifyRoom.pass == password){
            /*o Action vem do slug, dentro da função handleClick main.js*/
            if(action == "delete"){
                await db.run(`DELETE FROM questions where id = ${questionId}`)
                await db.close()
            }else if(action == "check"){
                await db.run(`UPDATE questions set read = 1 WHERE id = ${questionId}`)
                await db.close()
            }            
            
            return res.redirect(`/room/${roomId}`)

        }              
        await db.close()
        
        return res.render('passincorrect', {roomId: roomId, roomExists: roomExists})

      
    },

    async create(req, res) {
        const db = await Database()
        const question = req.body.question
        const roomId = req.params.room

        await db.run(`INSERT INTO questions(
            title,
            room,
            read
        )VALUES(
            "${question}",
            ${roomId},
            0
        )`)

        await db.close()

        return res.redirect(`/room/${roomId}`)

    }
}