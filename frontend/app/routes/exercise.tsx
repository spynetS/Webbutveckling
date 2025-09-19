/* Header grej med back button , titel Workuot exercise  X/ '/ 

/* Titel ffor choosen exercise X/ */

/* Picture of the exercise X/ */

/* Brackets with tre titels set reps weight */

/* Button to add a set */

/* Notes */

/* Buttom to ad */





const exercise = () => {
            return (
                    <main className='w-full h-screen flex flex-col gap-5 px-2 py-5'>

                        <div className="navbar bg-base-100 shadow-sm items-center">
                            <a className="btn btn-ghost text-center mt-3 text-xl">Arrow</a>
                            <a className="text-1xl font-bold text-center mt-3 items-center">
                            Compete agaisnt your friends </a>
                        </div>
                    <p className="text-5xl font-bold text-center mt-3">Choosen exercise</p>

                    <div className="card bg-base-100 w-96 shadow-sm items-center">
                        <figure>
                            <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Exercise" />
                        </figure>
                    </div>
                

                    <div className="rounded-box border border-base-content/5 bg-base-100">

                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th></th>
                            <th>Set</th>
                            <th>Rep</th>
                            <th>Weight</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                    
                <div className="flex flex-col items-center gap-4">
                <div>
                    <button className="btn">+Add Set</button>
                </div>

                <div>
                    <input type="text" placeholder="Notes" className="input" />
                </div>

                <div>
                     <button className="btn btn-neutral">Log exercise</button>
                </div>

                </div>
               


                    </main>
            )



}


export default exercise;