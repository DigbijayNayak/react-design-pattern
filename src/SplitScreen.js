import styled from "styled-components"
const Container = styled.div`
    display: flex;
`;
const Pane = styled.div`
    flex: ${props => props.weight};
`;
export const SplitScren = ({
    // left: Left,
    // right: Right,
    children,
    leftWeight = 1,
    rightWeight = 1,
}) => {
    const [left, right] = children;
    return (
        <Container>
            <Pane weight={leftWeight}>
                {/* <Left /> */}
                {left}
            </Pane>
            <Pane weight={rightWeight}>
                {/* <Right /> */}
                {right}
            </Pane>
        </Container>
    )
}