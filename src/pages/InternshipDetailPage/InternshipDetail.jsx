import { useNavigate, useParams } from "react-router-dom";
import "./InternshipDetail.css";


const InternshipDetail = () => {


    const navigate = useNavigate();

    const { id } = useParams();



    const internship = {


        id,

        title: "Frontend React Developer Intern",

        company: "Tech Solutions Company",

        location: "Remote",

        type: "Full Time",

        duration: "3 Months",

        paid: true,


        description:
        "We are looking for a passionate Frontend Developer Intern to join our team and work on modern web applications using React.js.",



        requirements:[

            "Knowledge of HTML, CSS, JavaScript",

            "Basic React.js experience",

            "Understanding of Git and GitHub",

            "Ability to work in a team"

        ],




        skills:[

            "React.js",

            "JavaScript",

            "Tailwind CSS",

            "Git"

        ]

    };






    return (


        <div className="internship-detail-page">





            <div className="internship-container">






                <section className="internship-header">



                    <div>


                        <h1>
                            {internship.title}
                        </h1>


                        <h3>
                            {internship.company}
                        </h3>


                        <div className="badges">


                            <span>
                                📍 {internship.location}
                            </span>


                            <span>
                                💼 {internship.type}
                            </span>


                            <span>
                                ⏳ {internship.duration}
                            </span>


                            <span>
                                {
                                    internship.paid
                                    ?
                                    "💰 Paid"
                                    :
                                    "Unpaid"
                                }
                            </span>



                        </div>



                    </div>




                    <button

                        className="apply-btn"

                        onClick={()=>navigate("/login")}

                    >

                        Apply Now

                    </button>



                </section>









                <div className="detail-grid">





                    <div className="detail-card">


                        <h2>
                            Internship Description
                        </h2>


                        <p>
                            {internship.description}
                        </p>


                    </div>








                    <div className="detail-card">


                        <h2>
                            Required Skills
                        </h2>


                        <div className="skills">


                            {
                                internship.skills.map(
                                    (skill,index)=>(

                                    <span key={index}>
                                        {skill}
                                    </span>

                                    )

                                )
                            }


                        </div>



                    </div>









                    <div className="detail-card">


                        <h2>
                            Requirements
                        </h2>


                        <ul>


                            {
                                internship.requirements.map(
                                    (item,index)=>(

                                    <li key={index}>
                                        {item}
                                    </li>

                                    )

                                )
                            }


                        </ul>


                    </div>





                </div>





            </div>




        </div>


    );


};



export default InternshipDetail;