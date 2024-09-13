import Wrapper from './Wrapper';
import Header from '../components/Header';

const stories = {
    title: 'Header',
    component: Header,
};

export default stories;

const TemplateStory = (args) => (
    <Wrapper states={{ authUser: args.authUser }}>
        <Header />
    </Wrapper>
);

const withProps = TemplateStory.bind({});

withProps.args = {
    authUser: {
        id: 'user-1', 
        name: 'Bryant Dawson Priyantoro'
    },
}

export { withProps };

