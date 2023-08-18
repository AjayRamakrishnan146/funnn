const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://AjayRamakrishnan12:Aju12K@cluster0.vmjotav.mongodb.net/adminapp?retryWrites=true&w=majorit', { useNewUrlParser: true, useUnifiedTopology: true, w: 'majority' })
.then(()=>{
    console.log(`Connected to database`)
})
.catch(()=>{
    console.log(`Error ! cannot connect to database`)
})