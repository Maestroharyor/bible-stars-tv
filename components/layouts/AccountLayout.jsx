import {useState, useEffect} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import { connect, useDispatch } from "react-redux";
import NotificationAlert from '../elements/NotificationAlert';

const AccountLayout = props => {
        const router = useRouter();
        let titleView;
        if (props.title !== undefined) {
            titleView = props.title + ' | ' + process.env.title + ' - ' + process.env.titleDescription;
        } else {
            titleView = process.env.title + ' | ' + process.env.titleDescription;
        }

        useEffect(()=> {
            if(props.auth.isLoggedIn){
              router.push("/dashboard")
            }
        })
    return(
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="description" content={`${props.description}`} />
                <meta name="theme-color" content="#fff" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maxiumum-scale=1" />
                {/* <link rel="icon" href="/images/logo/fav.png" /> */}
                <title>{titleView}</title>
            </Head>
            <NotificationAlert />
            {props.children}
        </>
    )
}


const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(AccountLayout);
  