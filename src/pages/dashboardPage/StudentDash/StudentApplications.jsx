import "./StudentDash.css";


const StudentApplications =()=>{


const applications=[


{
title:"Frontend Developer Intern",
company:"Tech Solutions",
status:"Pending"
},


{
title:"React Internship",
company:"Digital Hub",
status:"Accepted"
},


{
title:"Backend Intern",
company:"Code Factory",
status:"Rejected"
}


];



return (

<div className="applications-page">


<h1>
My Applications
</h1>


<p className="page-desc">
Track your internship applications status.
</p>





<div className="applications-table">


<div className="table-header">

<span>Internship</span>
<span>Company</span>
<span>Status</span>

</div>





{
applications.map((item,index)=>(


<div className="table-row" key={index}>


<span>
{item.title}
</span>


<span>
{item.company}
</span>



<span
className={`status ${item.status}`}
>

{item.status}


</span>



</div>


))

}



</div>



</div>


);


};


export default StudentApplications;