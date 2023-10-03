import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd/lib';
import LoadingStyles from '../styles/Loading.module.scss'

const antIcon = <LoadingOutlined style={{ fontSize: 48,color:"rgb(236, 86, 124)" }} spin rev={undefined} />;

const App: React.FC = () => <div className={LoadingStyles.loading}><Spin indicator={antIcon} /></div>;

export default App;