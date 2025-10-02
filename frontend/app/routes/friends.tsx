
/* Back arrow and Fitnessduel title*X/

/* Friends title *X/

/* pharagraph your friend code text and your code *Xy/

/* pharagraph list of all your friends that are online or ofline */

/* A button to add friends with title "Add Friend"*Xy/


/*A pharapragh where you can paste your friends code then add them as friends Xy*/




const friends = () => {
            return (
                    <main className='w-full h-screen flex flex-col gap-5 px-2 py-5'>

                        <div className="navbar bg-base-100 shadow-sm items-center">
                            <a className="btn btn-ghost text-center mt-3 text-xl">Arrow</a>
                            <a className="text-4xl font-bold text-center mt-3 items-center">
                             FitnessDuel
                            </a>
                        </div>


                    <p className="text-5xl font-bold text-center mt-3">Friends</p>
                    <p className="text-3xl font-bold text-center mt-3">Your Friend Code</p>

                     <div className="navbar bg-base-100 shadow-sm">
                        <div className="flex items-center justify-center w-full gap-2 mt-3">
                            <p className="text-lg font-bold">This will be your code</p>
                            
                            <button
                            className="btn btn-ghost p-2"
                            onClick={() => navigator.clipboard.writeText("FD-2807-4B")}
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M6 2a2 2 0 00-2 2v10h2V4h8V2H6z" />
                                <path d="M8 6a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2H10a2 2 0 01-2-2V6z" />
                            </svg>
                            </button>
                        </div>
                        </div>   



                     <div className="divide-y divide-gray-200 text-sm">
                                <p className="flex justify-between py-2 text-gray-800 font-medium">
                                <span>S S</span><span className="text-gray-500">2 timmar sen</span>
                                </p>
                                <p className="flex justify-between py-2 text-gray-800 font-medium">
                                <span>Stefan</span><span className="text-gray-500">3 dagar sen</span>
                                </p>
                                <p className="flex justify-between py-2 text-gray-800 font-medium">
                                <span>Stefan Strand</span><span className="text-gray-500">10 dagar sen</span>
                                </p>
                                <p className="flex justify-between py-2 text-gray-800 font-medium">
                                <span>Stefan emilio Strand</span><span className="text-gray-500">2 dagar sen</span>
                                </p>
                                <p className="flex justify-between py-2 text-gray-800 font-medium">
                                <span>Stefan emilio strand casanova</span><span className="text-gray-500">5 dagar sen</span>
                                </p>
                    </div>                          


                    <div className="flex flex-col items-center gap-4">

                        <div>
                            <button className="text-3xl btn btn-neutral">Add Friend</button>
                        </div>

                        <div>
                            <input type="text" placeholder="Your Friends Code" className="input" />
                        </div>

                    </div>
               


                    </main>
            )



}

export default friends;