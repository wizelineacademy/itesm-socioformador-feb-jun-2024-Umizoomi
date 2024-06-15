"use client"
import { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type FeedbackData = {
    activity: number;
    collaboration: number;
    communication: number;
    efficiency: number;
    flow: number;
    performance: number;
    satisfaction: number;
    wellBeing: number;
};

const fetchUserData = async (): Promise<FeedbackData> => {
    const response = await fetch(`/api/userfeedback`);
    if (!response.ok) {
        throw new Error('Failed to fetch user feedback');
    }

    return await response.json();
};

const UserFeedbackChart = () => {
    const [data, setData] = useState<FeedbackData | null>(null);

    useEffect(() => {
        fetchUserData()
            .then(data => {
                setData(data); 
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setData(null);
            });
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }
    console.log(data);

    const formattedData = [
        { subject: 'Well-Being', A: data.wellBeing },
        { subject: 'Flow', A: data.flow },
        { subject: 'Communication', A: data.communication },
        { subject: 'Proactivity', A: data.activity },
        { subject: 'Collaboration', A: data.collaboration },
        { subject: 'Satisfaction', A: data.satisfaction },
        { subject: 'Efficiency', A: data.efficiency },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="User" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default UserFeedbackChart;
