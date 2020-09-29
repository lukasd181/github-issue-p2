import React, { useEffect, useState } from "react";


const Job = () => {
    const [jobList, setJobList] = useState([]);
    const getJobData = async() => {
        try {
            const url = `http://localhost:5001/jobs`
            const response = await fetch(url);
            const data = await response.json;
            console.log("data", data)
            setJobList(data);

        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        getJobData();
    }, [])
  return <div>This is job</div>;
};

export default Job;
