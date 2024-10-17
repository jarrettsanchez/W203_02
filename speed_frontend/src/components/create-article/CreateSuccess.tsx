// successful submission screen
import Link from 'next/link';
import '@/app/globals.css';

const CreateSuccess = () => {
    return (
        <div className="container-fluid text-center vert-center">
            <h3 className='text-header mb-2'>Article submitted successfully.</h3>
            <p>Your article will be reviewed shortly.</p>
            <br />

            <Link href='/submit' className='btn btn-primary mb-2'>Submit another article</Link>
            <Link href='/articles' className='btn btn-success'>View articles</Link>
        </div>
    );
}

export default CreateSuccess;