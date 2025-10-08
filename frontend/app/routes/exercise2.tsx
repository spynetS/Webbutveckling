/*using the old code from exercise then setup a new for m where you can choose an apreint exercise picture 

/*you should be given a picrue from the beginning that fits wit hthe words use to describe the exercise you Named 

/*this fucntion should ocur throw modal in daosy ui*/

const exercise2 = () => {

            return (
                <main className='w-full h-screen flex flex-col gap-5 px-2 py-5'>
                    <div className=" navbar bg-base-100 shadow-sm items-center">
                        <a className="btn btn-ghost text-center mt-3 text-xl" >workout exercise</a>
                    </div>

                    <p className="text-5xl font-bold text-center mt-3"></p>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Change picture</button>
                    <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Press ESC key or click the button below to close</p>
                        <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                        </div>
                    </div>
                    </dialog>



                </main>
            )


}

export default exercise2

