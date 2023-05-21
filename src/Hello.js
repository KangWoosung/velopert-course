
//  펑션에서 수신하는 파라메터의 순서는 상관이 없다.
//  모듈을 호출하는 App.js 에서 파라메터 이름을 지정해서 전달해주기 때문에, 지정된 변수명을 그대로 받아서 사용한다.
function Hello({color, name, isSpecial }) {
  //  return 구문은 괄호 ( ) 로 감싸줘야만 한다.
  return (
    <div style={{ color }} >
        {/* React 에서 간단한 조건문은 3항연산자 또는 && 을 써서 세련되게 만들자. */}
        {isSpecial && <b>*</b>}
        안녕하세요 {name}
    </div>
  )
}

//  Default Props...
Hello.defaultProps = {
    name: '미화'
  }

export default Hello;