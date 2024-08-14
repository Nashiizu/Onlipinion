"use client"
import "../globals.css";
import "../home.css";
import styles from "./produto.module.css";
import Background from "../components/Background/Background";
import Box from "../components/Box/box";
import Text from "../components/Text/Text";


function Produto() {
    return (
        <>
            <Background className="background backgroundWhite center">
                <div className={styles.areaHeaderOthers}>
                    <div className={styles.rowPictureBox1}>
                        <div className={styles.colPictureBox1}>
                            <Box className={styles.pictureBox1}></Box>
                            <Box className={styles.pictureBox2}></Box>
                            <Box className={styles.pictureBox3}></Box>
                            <Box className={styles.pictureBox4}></Box>
                        </div>
                        <div className="colPictureBox2">
                            <Box className="pictureBox5"></Box>
                        </div>
                        <div className="textAreaHeader">
                            <Text className="title colorGreenDark">dsdsd</Text>
                        </div>
                    </div>
                </div>
            </Background>
        </>
    );
};

export default Produto;
