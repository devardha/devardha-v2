import firebase from '../lib/firebase'

export const trackUser = async (slug) => {
    const db = firebase.firestore()

    const getCountry = async () => {
        const res = await (await fetch('https://ipapi.co/json/')).json()
        const country_name = res.country_name
        return country_name
    }

    const country = await getCountry()

    // Add pageviews for analytics
    db.collection('posts').doc(slug).collection('views').doc().set({
        createdAt: new Date,
        country_name: country
    })
}