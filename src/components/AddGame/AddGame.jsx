import Swal from 'sweetalert2'

const AddGame = () => {
    const handleAddGame = (event) => {
        event.preventDefault();

        const form = event.target;

        const name = form.name.value;
        const review = form.review.value;
        const year = form.year.value;
        const genre = form.genre.value;
        const rating = form.rating.value;
        const availability = form.availability.value;
        const photo = form.photo.value;

        const newGame = { name, review, year, genre, rating, availability, photo };

        console.log(newGame);

        // send data to server 

        fetch('http://localhost:5000/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGame)
        })
        
        .then(res=>res.json())
        .then(data=> {
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    title: 'Success',
                    text: 'Game added successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })

            }
        })
    };

    return (
        <div className="bg-[#2dadd4] p-24">
            <h2 className="text-3xl font-extrabold text-red-800 text-center mb-4">Add Games</h2>
            <form onSubmit={handleAddGame}>
                {/* Form name and review row */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter game name"
                                className="input input-bordered w-full"
                                required
                            />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Review</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                name="review"
                                placeholder="Enter review"
                                className="input input-bordered w-full"
                                required
                            />
                        </label>
                    </div>
                </div>

                {/* Form year and genre row */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Published Year</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="number"
                                name="year"
                                placeholder="Enter year"
                                className="input input-bordered w-full"
                                required
                            />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Genre</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                name="genre"
                                placeholder="Enter genre"
                                className="input input-bordered w-full"
                                required
                            />
                        </label>
                    </div>
                </div>

                {/* Form rating and availability row */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="number"
                                name="rating"
                                placeholder="Enter rating"
                                className="input input-bordered w-full"
                                min="0"
                                max="10"
                                step="0.1"
                                required
                            />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Availability</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                name="availability"
                                placeholder="Enter availability"
                                className="input input-bordered w-full"
                                required
                            />
                        </label>
                    </div>
                </div>

                {/* Form Photo URL row */}
                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                name="photo"
                                placeholder="Enter photo URL"
                                className="input input-bordered w-full"
                                required
                            />
                        </label>
                    </div>
                </div>

                <input
                    type="submit"
                    value="Add Game"
                    className="btn btn-block bg-purple-800 text-white hover:bg-purple-700"
                />
            </form>
        </div>
    );
};

export default AddGame;
