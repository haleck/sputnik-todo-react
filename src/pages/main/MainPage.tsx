import React, {useState} from 'react';
import TasksList from "../../modules/TasksList";
import TaskCreatorModal from "../../components/TaskCreatorModal.tsx";
import styled from "styled-components";
import Button from "../../UI/Button";
import SidebarTools from "../../components/SidebarTools";
import Header from "../../UI/Header";

const MainPage = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    return (
        <Wrapper>
            <Container>
                <SidebarTools />
                <Content>
                    <StyledHeader>
                        ToDo App
                        <PinSvg />
                    </StyledHeader>
                    {modalVisible &&
                        <TaskCreatorModal isVisible={modalVisible} onClose={()=>setModalVisible(false)} />
                    }
                    <ButtonWrapper>
                        <Button $regular onClick={()=>setModalVisible(true)}>
                            Новая задача
                        </Button>
                    </ButtonWrapper>
                    <TasksList />
                </Content>
            </Container>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Container = styled.div`
  display: flex;
  gap: 25px;

  @media ${props => props.theme.media.laptop} {
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100vw;
    height: 100dvh;
    gap: 0;
  }
`

const Content = styled.div`
  margin-top: 2.5dvh;
  background-color: ${props => props.theme.background.content};
  width: min(100vw, 640px);
  max-height: 95dvh;
  padding: 20px 0 20px 20px;
  border: 3px solid ${props => props.theme.primary.light};
  border-radius: 15px;
  display: flex;
  flex-direction: column;

  @media ${props => props.theme.media.laptop} {
    border-radius: 0;
    border: none;
    min-height: 100dvh;
    width: 100%;
    margin: 0;
    padding-right: 30px;
    padding-left: 10px;
  }
  @media ${props => props.theme.media.tablet} {
    padding-right: 20px;
    padding-left: 0;
  }
  @media ${props => props.theme.media.phone} {
    padding-right: 0;
    padding-left: 20px;
  }
`;

const StyledHeader = styled(Header)`
  padding-right: 20px;
`

const ButtonWrapper = styled.div`
  padding-right: 20px;
  padding-top: 15px;
  padding-bottom: 25px;
`

const Svg = styled.svg`
  width: 35px;
  height: 35px;
  fill: ${props => props.theme.text.primary};
`;

const PinSvg = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960">
        <path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/>
    </Svg>
)


export default MainPage;