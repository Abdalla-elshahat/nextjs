import Link from 'next/link'
import styles from "./header.module.css";
import Navbar from './Navbar';
import { cookies } from 'next/headers';
import LogoutButton from './LogoutButton';
import { verifyTokenForPage } from '@/app/utels/generateJWT';

const Header = () => {
  const token = cookies().get("token")?.value || "";
  const payload = verifyTokenForPage(token);

  return (
    <header className={styles.header}>
      <Navbar isAdmin={payload?.isAdmin|| false} />
      <div className={styles.right}>
        {payload ? (
          <>
            <strong className='text-blue-800 md:text-xl capitalize'>
              {payload?.username}
            </strong>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link className={styles.btn} href="/Login">Login</Link>
            <Link className={styles.btn} href="/Rejester">Register</Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header