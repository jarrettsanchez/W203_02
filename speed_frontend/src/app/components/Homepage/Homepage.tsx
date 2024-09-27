"use client";

import './Homepage.css';
import { useRouter } from 'next/navigation'; 
import { AiOutlineDashboard } from "react-icons/ai";
import { GrArticle } from "react-icons/gr";
import { MdOutlineRateReview } from "react-icons/md";

const Homepage = () => {
    const router = useRouter(); 

    return (
        <div className='sidenav'>
            <h3>SPEED</h3>
            <p>_________________________</p>
            <ul>

                {/* Sidebar */}
                <li>
                    <button onClick={() => router.push('/dashboard')}>
                        <AiOutlineDashboard size={30} /> Dashboard
                    </button>
                </li>
                <li>
                    <button onClick={() => router.push('/viewall')}>
                        <GrArticle size={30} /> View all 
                    </button>
                </li>
                <li>
                    {/* Corrected route to lowercase */}
                    <button onClick={() => router.push('/review')}>
                        <MdOutlineRateReview size={30} /> Review all articles
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Homepage;
