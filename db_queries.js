const Pool = require('pg').Pool
const pool = new Pool({
  user: 'cemarslan',
  host: 'localhost',
  database: 'apirequests',
  password: '118805cm',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM apirequests ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}


const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM apirequests WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}


const createUser = (request, response) => {
    const { name, age, nationality, email } = request.body
  
    pool.query('INSERT INTO apirequests (name, age, nationality, email) VALUES ($1, $2, $3, $4)', [name, age, nationality, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added.`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE apirequests SET name = $1, age = $2, nationality = $3, email = $4 WHERE id = $5',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM apirequests WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}