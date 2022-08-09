import styles from '../styles/styles.module.scss'
import Layout from '../components/layout'

import NProgress from 'nprogress'
import { Flipper, Flipped } from 'react-flip-toolkit'

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth' // Firebase v9+
import { collection, getFirestore, doc, updateDoc, setDoc, arrayUnion, arrayRemove, query, orderBy, limit, Timestamp } from 'firebase/firestore'
import { FirebaseAppProvider, FirestoreProvider, AuthProvider, useFirebaseApp, useFirestore, useSigninCheck, useUser, useFirestoreCollectionData, useFirestoreDocData } from 'reactfire'

const pageTitle = "Đề cử bản quyền"
const pageDescription = "Đề cử bản quyền để truyện có thêm cơ hội được xuất bản!"

export async function getStaticProps() {
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
    }

    return {
        props: {
            firebaseConfig
        }
    }
}

export default function Vote({ firebaseConfig }) {
    return (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <Layout title={pageTitle} description={pageDescription}>
                <div className={`uk-container ${styles.main}`}>
                    <h1 className={`uk-heading-line uk-margin-medium ${styles.title}`}><span>Đề cử bản quyền (beta)</span></h1>
                    <Providers />
                </div>
            </Layout>
        </FirebaseAppProvider>
    )
}

function Providers() {
    const app = useFirebaseApp() // a parent component contains a `FirebaseAppProvider`

    // initialize Database and Auth with the normal Firebase SDK functions
    const auth = getAuth(app)
    const firestoreInstance = getFirestore(app)

    return (
        <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
                <ListingApp />
            </FirestoreProvider>
        </AuthProvider>
    )
}

function ListingApp() {
    const { status, data: signInCheckResult } = useSigninCheck()

    if (status === 'loading') {
        return <span>Đang tải...</span>;
    }

    if (signInCheckResult.signedIn === true) {
        return (
            <>
                <UserInfo /><br />
                <div uk-alert="true">
                    Số lượng đề cử sẽ được cập nhật sau mỗi <strong>5</strong> phút.
                </div>
                <Listing />
                <div uk-alert="true">
                    <strong>Bạn muốn thêm đề cử?</strong> Nhằm tránh spam, bạn vui lòng thêm đề cử vào inbox của chúng mình tại <a href="https://m.me/mangaGLHF" title="Facebook Messenger" target="_blank" rel='noreferrer'>đây</a>.<br />
                </div>
                <div uk-alert="true">
                    Nhằm tránh tình trạng danh sách đề cử quá dài, các đề cử quá 10 ngày không có trạng thái sẽ được xóa. Bạn có thể đề cử lại thông qua fanpage!
                </div>
            </>
        )
    } else {
        return (
            <>
                <SignIn />
                <div uk-alert="true">
                    Bạn vui lòng đăng nhập để có thể bắt đầu đề cử! ╰(*°▽°*)╯ Khách chỉ có thể xem TOP 10 đề cử và không được cập nhật tự động.
                </div>
                <GuestListing />
                <div uk-alert="true">
                    <strong>Bạn muốn thêm đề cử?</strong> Nhằm tránh spam, bạn vui lòng thêm đề cử vào inbox của chúng mình tại <a href="https://m.me/mangaGLHF" title="Facebook Messenger" target="_blank" rel='noreferrer'>đây</a>.<br />
                </div>
                <div uk-alert="true">
                    Nhằm tránh tình trạng danh sách đề cử quá dài, các đề cử quá 10 ngày không có trạng thái sẽ được xóa. Bạn có thể đề cử lại thông qua fanpage!
                </div>
            </>
        )
    }
}

function SignIn() {
    const auth = getAuth()
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    return (
        <>
            <button className="uk-button uk-button-primary" onClick={signInWithGoogle}>Đăng nhập với Google</button>
        </>
    )
}

function UserInfo() {
    const { status, data: user } = useUser()

    if (status === 'loading') {
        NProgress.start()
        return <span>Đang tải...</span>
    }

    NProgress.done()
    return (
        <>
            <span>Xin chào, {user.displayName}. </span>
            <SignOut />
        </>
    )
}

function SignOut() {
    const auth = getAuth()

    return <a href="#" onClick={() => signOut(auth)}>Đăng xuất</a>
}

function Listing() {
    const firestore = useFirestore()

    const { data: user } = useUser()

    const entriesCollection = collection(firestore, 'entries')
    const entriesQuery = query(entriesCollection, orderBy("voteCount", "desc"))

    const userDoc = doc(firestore, 'users', user.uid)

    const { data: entries } = useFirestoreCollectionData(entriesQuery, { idField: 'id' })
    const { status, data: userVoted } = useFirestoreDocData(userDoc)

    async function createVote(id, uid) {
        await setDoc(doc(firestore, "users", uid), {
            entriesIds: [id],
            timestamp: Timestamp.fromDate(new Date()),
        })
    }

    async function upvote(id, uid) {
        const entryRef = doc(firestore, "users", uid)

        await updateDoc(entryRef, {
            entriesIds: arrayUnion(id),
            timestamp: Timestamp.fromDate(new Date()),
        })
    }

    async function removeVote(id, uid) {
        const entryRef = doc(firestore, "users", uid)

        await updateDoc(entryRef, {
            entriesIds: arrayRemove(id),
            timestamp: Timestamp.fromDate(new Date()),
        })
    }

    if (status === 'loading') {
        NProgress.start()
        return <span>Đang tải...</span>
    }

    NProgress.done()
    return (
        <>
            <Flipper flipKey={(entries.map(e => e.id)).join('')}>
                <ul className="uk-margin-top" uk-grid="true">
                    {entries.map((entry) => (
                        <Flipped key={entry.id} flipId={entry.id}>
                            <li className="uk-width-1-1 uk-flex" key={entry.id}>
                                <div className="uk-flex uk-flex-column uk-flex-center uk-flex-middle uk-margin-right">
                                    {userVoted === undefined ?
                                        // user mới, chưa đề cử
                                        <a href="#" onClick={() => createVote(entry.id, user.uid)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                            </svg>
                                        </a>
                                        : (!userVoted.entriesIds.includes(entry.id) ?
                                            // chưa đề cử
                                            <a href="#" onClick={() => upvote(entry.id, user.uid)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                                </svg>
                                            </a>
                                            :
                                            // đã đề cử
                                            <a href="#" style={{ color: "#fbea11" }} onClick={() => removeVote(entry.id, user.uid)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                                </svg>
                                            </a>
                                        )}
                                    <div className="uk-margin-top">
                                        <h4>{entry.voteCount}</h4>
                                    </div>
                                </div>
                                <div className="uk-card uk-card-default uk-flex uk-width-expand" style={{ background: `url(${entry.cover})` }}>
                                    <div className="uk-card-media-left uk-cover-container">
                                        <img loading="lazy" src={entry.image} alt={entry.name} className="uk-width-medium" uk-cover="true" />
                                        <canvas width="100" height="155"></canvas>
                                    </div>
                                    <div className="uk-width-expand">
                                        <div className="uk-card-body">
                                            <div className="uk-card-badge uk-label uk-text-small uk-text-capitalize uk-margin-remove" style={{ top: 0, right: 0, borderRadius: '0 0 0 0.5rem' }}>{entry.format}</div>
                                            <h3 className="uk-card-title">{entry.name}</h3>
                                            <p className="uk-invisible@s uk-visible@m" dangerouslySetInnerHTML={{ __html: entry.description }}></p>
                                            {entry.anilist && <a href={`//anilist.co/manga/${entry.anilist}`} target="_blank">AniList</a>}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </Flipped>
                    ))}
                </ul>
            </Flipper>
        </>
    )
}


function GuestListing() {
    const firestore = useFirestore()

    const entriesCollection = collection(firestore, 'entries')
    const entriesQuery = query(entriesCollection, orderBy("voteCount", "desc"), limit(10))

    const { status, data: entries } = useFirestoreCollectionData(entriesQuery, { idField: 'id' })

    if (status === 'loading') {
        NProgress.start()
        return <span>Đang tải...</span>
    }

    NProgress.done()
    return (
        <Flipper flipKey={(entries.map(e => e.id)).join('')}>
            <ul className="uk-margin-top" uk-grid="true">
                {entries.map((entry) => (
                    <Flipped key={entry.id} flipId={entry.id}>
                        <li className="uk-width-1-1 uk-flex" key={entry.id}>
                            <div className="uk-flex uk-flex-column uk-flex-center uk-flex-middle uk-margin-right">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                </svg>
                                <div className="uk-margin-top">
                                    <h4>{entry.voteCount}</h4>
                                </div>
                            </div>
                            <div className="uk-card uk-card-default uk-flex uk-width-expand" style={{ background: `url(${entry.cover})` }}>
                                <div className="uk-card-media-left uk-cover-container">
                                    <img loading="lazy" src={entry.image} alt={entry.name} className="uk-width-medium" uk-cover="true" />
                                    <canvas width="100" height="155"></canvas>
                                </div>
                                <div className="uk-width-expand">
                                    <div className="uk-card-body">
                                        <h3 className="uk-card-title">{entry.name}</h3>
                                        <p className="uk-invisible@s uk-visible@m" dangerouslySetInnerHTML={{ __html: entry.description }}></p>
                                        {entry.anilist && <a href={`//anilist.co/manga/${entry.anilist}`} target="_blank">AniList</a>}
                                    </div>
                                </div>
                            </div>
                        </li>
                    </Flipped>
                ))}
            </ul>
        </Flipper>
    )
}