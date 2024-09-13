import { Card, CardBody, Typography } from '@material-tailwind/react';

import LeaderboardItem from "../components/LeaderboardItem";

const stories = {
    title: 'LeaderboardItem',
    component: LeaderboardItem
}

export default stories;

const TemplateStory = (args) => (
    <Card className="w-4/5 md:w-3/4 lg:w-1/2 xl:w-2/5">
        <CardBody>
        <Typography variant="h5" color="black">
            Klasemen Pengguna Aktif
        </Typography>
        <div className="my-4 flex items-center justify-between">
            <Typography variant="small" color="black" className="font-bold">
            Nama
            </Typography>
            <Typography variant="small" color="black" className="font-bold">
            Skor
            </Typography>
        </div>
        <div className="divide-y divide-gray-200">
            <LeaderboardItem user={args.user} score={args.score} />
        </div>
        </CardBody>
    </Card>
);

const withProps = TemplateStory.bind({});

withProps.args = {
    user: {
        id: 'user-1',
        name: 'Bryant D.P',
        email: 'bryantdp@dicoding.com',
        avatar: `https://ui-avatars.com/api/?name=Bryant&background=random`,
    },
    score: 25,
}

export { withProps };
