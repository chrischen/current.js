import * as React from 'react';
// import style from '../../global/static.css?inline';
import '../../global/static.css';
// import GlobalStyles from '../../global/styles';
import Nav from '../organisms/Nav.gen';
import Footer from '../organisms/Footer.gen';
import { UserProvider_make as UserProvider } from './UserProvider.gen'
// import TagManager from 'react-gtm-module';

// style;
// if (typeof window !== 'undefined') {
//   const tagManagerArgs = {
//     gtmId: '',
//   };
//
//   TagManager.initialize(tagManagerArgs);
// }

const DefaultLayout: React.FC<{ children: JSX.Element, fragmentRefs: any }> = ({ children, fragmentRefs }) => (
  <UserProvider fragmentRefs={fragmentRefs}>
    <Nav fragmentRefs={fragmentRefs} />
    {children}
    <Footer />
  </UserProvider>
);

export default DefaultLayout;

