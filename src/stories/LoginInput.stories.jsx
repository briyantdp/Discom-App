import { Link } from 'react-router-dom';

import {
    Card,
    CardBody,
    CardFooter,
    Typography,
  } from '@material-tailwind/react';

import Wrapper from './Wrapper';
import LoginInput from '../components/LoginInput';

const stories = {
    title: 'LoginInput',
    component: LoginInput,
};

export default stories;

const TemplateStory = (args) => (
    <Wrapper>
        <main className="login-page h-screen flex flex-col justify-center items-center py-56 md:py-48 lg:py-36">
            <Card className="w-full md:w-3/4 lg:w-1/2 xl:w-1/4">
                <CardBody className="flex flex-col gap-4">
                <Typography variant="h3" color="black" className="text-center">
                    Halaman Login
                </Typography>
                <LoginInput login={args.login} />
                </CardBody>
                <CardFooter className="pt-0">
                <Typography variant="small" className="mt-6 flex justify-center">
                    Belum punya akun ?
                    <Link to="/register" className="ml-1 font-bold to-blue-gray-900">
                    Daftar di sini
                    </Link>
                </Typography>
                </CardFooter>
            </Card>
        </main>
    </Wrapper>
);

const withProps = TemplateStory.bind({});

withProps.args = {
    login: () => {},
}

export { withProps };

