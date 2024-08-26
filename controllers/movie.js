const Movie = require('../models/Movie');
const { errorHandler } = require("../auth");

module.exports.addMovie = async (req, res) => {
    try {
        let newMovie = new Movie({
            title: req.body.title,
            director: req.body.director,
            year: req.body.year,
            description: req.body.description,
            genre: req.body.genre,
        });

        const result = await newMovie.save();

        return res.status(201).send(result);
    } catch (err) {

        return errorHandler(err, req, res);
    }
};

module.exports.getAllMovies = async (req, res) => {

    try {

        const result = await Movie.find({});

        if (result.length > 0) {

            return res.status(200).json({ movies: result });
        } else {

            return res.status(404).json({ message: 'No movies found' });
        }
    } catch (err) {

        return errorHandler(err, req, res);
    }
};

module.exports.getMovieById = async (req, res) => {
    try {
        const { movieId } = req.params; 

        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json(movie);
        
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while searching for the movie', error });
    }
};

module.exports.updateMovie = async (req, res) => {
    let updatedMovie = {
        title : req.body.title,
        director : req.body.director,
        year : req.body.year,
        description : req.body.description,
        genre : req.body.genre     
    }

    try {
        const movie = await Movie.findByIdAndUpdate(req.params.movieId, updatedMovie);
        if (movie) {
            res.status(200).send({
                message: 'Movie updated successfully',
                updatedMovie: movie
            });
        } else {
            res.status(404).send({ message: 'Movie not found' });
        }
    } catch (err) {
        return errorHandler(err, req, res);
    }
}

module.exports.deleteMovie = async (req, res) => {
    
    try {
        const deleteMovie = await Movie.findByIdAndDelete(req.params.movieId)
        if (deleteMovie) {
            res.status(200).send({
                message: 'Movie deleted successfully'
            })
        } else {
            res.status(404).send({
                message: 'Movie not found'
            })
        }
    } catch (err) {
        return errorHandler(err, req, res)
    }

}

module.exports.addMovieComment = async (req, res) => {
    try {
        const  userId  = req.user.id;
        const { movieId } = req.params;
        const { comment } = req.body;

        const updatedMovie = await Movie.findByIdAndUpdate(
            movieId,
            {
                $push: {
                    comments: {
                        userId,
                        comment,
                    }
                }
            },
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({
            message: 'Comment added successfully',
            updatedMovie,
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

module.exports.getMovieComment = async (req, res) => {
    try {
        const { movieId } = req.params;

        // Find the movie by ID
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json(movie.comments);
        
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while searching for the movie', error });
    }
};