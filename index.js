const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();
server.use(helmet());
server.use(express.json());


// A project has  
//   - [ ] A `project` can contain multiple actions and has:
//   - [ ] a unique Id. // automatically assigned
//   - [ ] a name. //required
//   - [ ] a description. //required
//   - [ ] a flag that indicates if the project is complete or not. //required
//---------------------------------------------------------------------------------//

server.post('/api/projects', (req, res) => {
    const {name, description} = req.body;

    if (!name || !description) {
        res.status(500).json({message: "Please provide name and/or description."})
    } else {
        db('projects')
        .insert(req.body)
		.then((ids) => {
			const [ id ] = ids;

            db('projects')
                .where({ id })
                .first()
                .then((project) => {
				    res.status(200).json({message: "Added Success", project});
			});
		})
		.catch((err) => {
			res.status(500).json(err);
		});
    }

});


//   - [ ] An `action` belongs to only one project. An action has:
//   - [ ] a unique id.
//   - [ ] a description of what needs to be done.
//   - [ ] a notes column to add additional information.
//   - [ ] a flag that indicates if the action has been completed.
//   - [ ] requires a project ID from params
//---------------------------------------------------------------------------------//

server.post('/api/actions/:id', (req, res) => {
    const {name, description, notes} = req.body;
    const {id} = req.params;
    const action = {
        name: name,
        description: description,
        notes: notes,
        project_id: id
    }

    if (!name || !description || !notes) {
        res.status(500).json({message: "Please provide name, description, and/or notes."})
    } else {
        db('actions')
        .insert(action)
		.then((ids) => {
			const [ id ] = ids;

            db('actions')
                .where({ id })
                .first()
                .then((action) => {
				    res.status(200).json({message: "Added Success", action});
			});
		})
		.catch((err) => {
			res.status(500).json(err);
		});
    }
});


// - [ ] GET for retrieving a `project` by its `id` that returns an object with the following structure:
//---------------------------------------------------------------------------------//


server.get('/api/projects/:id/actions', (req, res) => {
    const {id} = req.params;

    db('projects')
    .where({id: id})
    .then(project => {
        console.log(project);

        if (project.length > 0) {
            db('actions')
            .where({project_id: id})
            .then(action => {
                console.log(action)
                
                if (action.length > 0) {
                    res.status(200).json({project, action})
                } else {
                    res.status(404).json({ message: 'No actions with that id exists.' });
                }
            })
            .catch()
        } else {
            res.status(404).json({ message: 'No project with that id exists.' });
        }
    })
    .catch(err => {
        res.status(404).json(err);
    })
});


//---------------------------------------------------------------------------------//

server.get('/api/projects', (req, res) => {

    db('projects')
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        res.status(404).json(err);
    })

});


//---------------------------------------------------------------------------------//

server.get('/api/actions', (req, res) => {

    db('actions')
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.status(404).json(err);
    })
});


//---------------------------------------------------------------------------------//

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n** API running on http://localhost:${port} **\n`));
