// successful submission screen
import Link from 'next/link';

const CreateSuccess = () => {
    return (
        <div className="container-fluid text-center">
            <h3>Article submitted successfully.</h3>
            <p>Your article will be reviewed shortly.</p>
            <Link href='/submit' className='btn btn-primary mr-1'>Submit another article</Link>
            <Link href='/articles' className='btn btn-success'>View articles</Link>
        </div>
    );
}

export default CreateSuccess;