const express = require('express');

const Question = require('./QuestionDB.js');
const cors = require('cors')
const { where } = require('sequelize')

const app = express()
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())
app.use(cors())

app.get('/questions', async (req, res) => {
    const questions = await Question.findAll()
    res.send(questions)
})

app.get('/question/:id', async (req, res) => {
    const id  = req.params.id;
    const question = await Question.findOne({where: {id: id}})
    res.send(question)
})

app.post('/question', async (req, res) => {
    const { name, answer1, answer2, answer3, answer4, corectanswer } = req.body;
    if (!name || !answer1 || !answer2 || !answer3 || !answer4 || !corectanswer) {
        return res.status(400).json({ error: "Name, answer1, answer2, answer3, answer4 and corectanswer are required" });
    }
    if(req.body.name === undefined || req.body.name === " " || req.body.name === ""){
        return res.json({error: "name is required"})   
    }
    if(req.body.answer1 === undefined || req.body.answer1 === " " || req.body.answer1 === ""){
        return res.json({error: "answer1 is required"})   
    }
    if(req.body.answer2 === undefined || req.body.answer2 === " " || req.body.answer2 === ""){
        return res.json({error: "answer2 is required"})   
    }
    if(req.body.answer3 === undefined || req.body.answer3 === " " || req.body.answer3 === ""){
        return res.json({error: "answer3 is required"})   
    }
    if(req.body.answer4 === undefined || req.body.answer4 === " " || req.body.answer4 === ""){
        return res.json({error: "answer4 is required"})   
    }
    if(req.body.corectanswer === undefined || req.body.corectanswer === " " || req.body.corectanswer === ""){
        return res.json({error: "corectanswer is required"})   
    }
    const createQuestion = await Question.create({name: `${req.body.name}`, answer1: `${req.body.answer1}`, answer2: `${req.body.answer2}`, answer3: `${req.body.answer3}`, answer4: `${req.body.answer4}`, corectanswer: `${req.body.corectanswer}`})
    res.send(createQuestion)
})

app.post('/question/:id/:answer', async (req, res) => {
    const questionId = parseInt(req.params.id);  
    const userAnswer = req.body.answer;
    console.log(questionId)          
    console.log(userAnswer)
    const question = await Question.findOne({where: {id: questionId}});
  
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    if (userAnswer === question.corectanswer) {
        console.log(question.corectanswer)
        res.json({ correct: true, message: 'Правильна відповідь' });
    } else {
        console.log(question.corectAnswer)
        res.json({ correct: false, message: 'Неправильна відповідь' });
    }
  });

app.listen(8000)