import { pool } from "../db.js"

// GET
export const getTales = async (req, res) => {
  try {
    const [response] = await pool.query("SELECT * FROM tales");
    res.json(response)
  } catch (error) {
    return res.status(500).json({
      message: "Sorry, something goes wrong"
    })
  }
};

// SHOW
export const getTaleById = async (req, res) => {
  const id = req.params.id;
  try {
    const [response] = await pool.query("SELECT * FROM tales WHERE id = ?", [id]);
    
    if (response.length <= 0) return res.status(404).json({
      message: "Tale not found" 
    });

    res.json(response[0])
  } catch (error) {
    return res.status(500).json({
      message: "Sorry, something goes wrong"
    })
  }
};

// CREATE
export const createTales = async (req, res) => {
  const {title, summary, genres, type, web_platform, creator, about_creator, social_networks} = req.body
  const image = req.file;
  try {
    if(image){
      let img_url = `http://localhost:3000/image/${image.filename}`;
      const [response] = await pool.query("INSERT INTO tales (title, img_url, summary, genres, type, web_platform, creator, about_creator, social_networks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                                          [title, img_url, summary, genres, type, web_platform, creator, about_creator, social_networks]);
      res.send({
        id: response.insertId,
        title, img_url, summary, genres, type, web_platform, creator, about_creator, social_networks,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Sorry, something goes wrong"
    })
  }
};

// UPDATE
export const updateTales = async (req, res) => {
  const id = req.params.id;
  const {title, summary, genres, type, web_platform, creator, about_creator, social_networks} = req.body
  const image = req.file;
  try {
    let img_url = ""
    image ? img_url = `http://localhost:3000/image/${image.filename}` : img_url = null;
      
    const [response] = await pool.query("UPDATE tales SET title = IFNULL(?, title), img_url = IFNULL(?, img_url), summary = IFNULL(?, summary), genres = IFNULL(?, genres), type = IFNULL(?, type), web_platform = IFNULL(?, web_platform), creator = IFNULL(?, creator), about_creator = IFNULL(?, about_creator), social_networks = IFNULL(?, social_networks) WHERE id = ?",
                                        [title, img_url, summary, genres, type, web_platform, creator, about_creator, social_networks, id]);
  
    if (response.affectedRows <= 0) return res.status(404).json({
      message: "Tale not found" 
    });
    
    const [result] = await pool.query("SELECT * FROM tales WHERE id = ?", [id]);
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Sorry, something goes wrong"
    })
  }
};

// DELETE
export const deleteTales = async (req, res) => {
  const id = req.params.id;
  try {
    const [response] = await pool.query("DELETE FROM tales WHERE id = ?", [id]);
    
    if (response.affectedRows <= 0) return res.status(404).json({
      message: "Tale not found" 
    });
  
    res.json(`Tale ${id} deleted`);
  } catch (error) {
    return res.status(500).json({
      message: "Sorry, something goes wrong"
    })
  }
};
