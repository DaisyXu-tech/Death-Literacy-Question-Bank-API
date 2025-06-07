import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let questions = [
    {  
      id:1,
      QuestionText:
        "Talking about death, dying or grief to a close friend",
      Domain:"🗣️ Talking-Support",
    },

    {
      id:2,
      QuestionText:
      "Talking about death, dying or grieving with a child",
      Domain:"🗣️ Talking-Support",
    },

    {
      id:3,
      QuestionText:
      "Talking to a grieving person about their loss",
      Domain:"🗣️ Talking-Support",
    },

    {
      id:4,
      QuestionText:
      "Talking to a health professional about getting support for a dying person where they live",
      Domain:"🗣️ Talking-Support",
    },
    
    {
      id:5,
      QuestionText:
       "Feed or help a person to eat",
       Domain:"👐 Providing Hands-On Care",
    },
    {
      id:6,
      QuestionText:
       "Wash a person",
      Domain:"👐 Providing Hands-On Care",
    },
    {
      id:7,
      QuestionText:
       "Lifting a person or helping them move",
      Domain: "👐 Providing Hands-On Care",
    },
    {
      id:8,
      QuestionText:
       "Administer injections",
      Domain:"👐 Providing Hands-On Care",
    },
    {
      id:9,
      QuestionText:
       "Made me more emotionally prepared to support others with death, dying and bereavement",
      Domain: "🌱 Experiential Knowledge",
    },
    {
      id:10,
      QuestionText:
       "Made me think about what is important and not important in life",
      Domain: "🌱 Experiential Knowledge",
    },
    {
      id:11,
      QuestionText:
      "Developed my wisdom and understanding",
      Domain:"🌱 Experiential Knowledge",
    },
    {
      id:12,
      QuestionText:
       "Made me more compassionate toward myself",
      Domain:"🌱 Experiential Knowledge",
    },
    {
      id:13,
      QuestionText:
       "Made me better prepared to face similar challenges in the future",
       Domain:"🌱 Experiential Knowledge",
    },
    {
      id:14,
      QuestionText:
       "I know the rules and regulations when a person dies at home",
      Domain:"📘 Factual Knowledge",
    },
    {
      id:15,
      QuestionText:
       "I know what documents are needed when planning for death",
      Domain:"📘 Factual Knowledge",
    },
    {
      id:16,
      QuestionText:
      "I know enough about the healthcare system to find the support that a dying person needs",
      Domain:"📘 Factual Knowledge",
    },
    {
      id:17,
      QuestionText:
      "I know enough to make decisions about funeral services and options",
      Domain:"📘 Factual Knowledge",
    },

    {
      id:18,
      QuestionText:
       "I know how to access palliative care in my area",
      Domain:"📘 Factual Knowledge",
    },
    {
      id:19,
      QuestionText:
       "I know enough about how illnesses progress to make decisions about medical treatments at end of life",
      Domain:"📘 Factual Knowledge",
    },
    {
      id:20,
      QuestionText:
      "I know about the ways that cemetery staff can be of help around funerals",
      Domain:"📘 Factual Knowledge",
    },
    {
      id:21,
      QuestionText:
       "To get support in the area where I live (e.g. from clubs, associations or volunteer groups)",
      Domain:"🌏 Community Knowledge",
    },
    {
      id:22,
      QuestionText:
       "To get help with providing day-to-day care for a person at the end of life",
      Domain:"🌏 Community Knowledge",
    },
    {
      id:23,
      QuestionText:
       "To get equipment that is required for care",
      Domain:"🌏 Community Knowledge",
    },
    {
      id:24,
      QuestionText:
        "To get support that is culturally appropriate for a person",
      Domain:"🌏 Community Knowledge",
    },
    {
      id:25,
      QuestionText:
       "To get emotional support for myself",
      Domain:"🌏 Community Knowledge",
    },
    {
      id:26,
      QuestionText:
       "People with life threatening illnesses",
      Domain:"🤝 Community Support",
    },
    {
      id:27,
      QuestionText:
        "People who are nearing the end of their lives",
      Domain:"🤝 Community Support",
    },
    {
      id:28,
      QuestionText:
       "People who are caring for a dying person",
      Domain:"🤝 Community Support",
    },
    {
      id:29,
      QuestionText:
       "People who are grieving",
      Domain:"🤝 Community Support",
    },
];
       

let lastId = 29;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/questions", (req, res) => {
  console.log(questions);
  res.json(questions);
});

// GET a specific question by id
app.get("/questions/:id", (req, res) => {
  const question = questions.find((q) => q.id === parseInt(req.params.id));
  if (!question) return res.status(404).json({ message: "Question not found" });
  res.json(question);
});

// POST a new question
app.post("/questions", (req, res) => {
  const newId = lastId += 1;
  const question = {
    id: newId,
    QuestionText: req.body.content,
    Domain: req.body.domain,
  };
  lastId = newId;
  questions.push(question);
  res.status(201).json(question);
});

// PATCH a question when you just want to update one parameter
app.patch("/questions/:id", (req, res) => {
  const question = questions.find((q) => q.id === parseInt(req.params.id));
  if (!question) return res.status(404).json({ message: "Question not found" });

  if (req.body.content) question.QuestionText= req.body.content;
  if (req.body.domain) question.Domain = req.body.domain;

  res.json(question);
});

// DELETE a specific question by providing the post id
app.delete("/questions/:id", (req, res) => {
  const index = questions.findIndex((q) => q.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "question not found" });

  questions.splice(index, 1);
  res.json({ message: "Question deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});



