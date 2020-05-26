import React,{Component, useState} from "react";
import {Button} from "react-bootstrap";
import './list.css'
import {Container, Row, Card, Modal,InputGroup} from "react-bootstrap";


 export default class Joblists  extends Component {

     constructor(props) {
         super(props);
         this.state={
             show:false,
             count:0,
             time:0,

         }
         this.arr=[]
         this.image = new Map()
         console.log(typeof this.image)
         this.image={
             "google":"/google.png",
             "facebook":"/facebook.png",
             "airbnb": "/airbnb.png",
             "linkedin": "/linkedin.png"
         }
         this.color=["#CE6852","#D7BAB4", "#8C4A3C", "#3E65B3","#304878","#611620","#4F0B14","#C6C630","#DBDB53","#61611F","#889E83","#8CEA75","#0F3905","#58884C"]
         this.data=[

         ]

     }
     intervalID;
     componentDidMount() {
         this.updateTime();
         this.intervalID = setInterval(this.updateTime.bind(this), 60000);
     }
     componentWillUnmount() {
         clearInterval(this.intervalID);
     }
     updateTime = () => {
         this.setState({time:this.state.time+1})
         for (let key in this.data){
             this.data[key].time = this.data[key].time+60
         }
     }
     handleShow = () => this.setState({show: true});

     handleClose = () => {
         this.setState({show: false});
         const name = document.getElementById("comp").value;
         const pos = document.getElementById("pos").value;
         const obj ={
             "name":name,
             "position": pos,
             "time":0,
         }
         this.data.push(obj);
         if (name!=="" && pos!==""){
             this.setState(prevState => ({
                     count: prevState.count +1
                 }
             ))
         }
     }
     handleShowDel=()=>{
         this.setState({show:true})
     }

     handleCloseDel=()=>{
         this.setState({show: false});
     }

     deleteJob=(event)=>{
         console.log("inside del",event.target.id)

         delete this.data[event.target.id]
         this.setState({count: this.state.count-1})
         this.forceUpdate()
     }

     renderObject(){
         return Object.entries(this.data).map(([key, value], i) => {
             let time = new Date().toLocaleString();
             var color = this.color[Math.floor(Math.random() * this.color.length)];
             var img = this.image[value.name.toLocaleLowerCase()]
             if(img===undefined){
                 img="/favicon.ico"
             }

             if (value.name!=="" && value.position!=="")
             {
                 if (this.data.length!==0){

                     return (

                         <Row className="Content" key={key} id={key}>
                             <Card style={{background:color}} className="card  blockquote text-white" >
                                 <Card.Body>
                                     <h3> <img width="38"  src={img}></img>
                                         &ensp;
                                         {value.name}
                                         <a>
                                             <button className="button float-right" id={key} onClick={this.deleteJob}>
                                                 <img   id={key} width="20" src="/delIcon.png"/>
                                             </button>
                                         </a>
                                     </h3>
                                     <Card.Text>
                                         <h5 className="posi">&nbsp;{value.position}</h5>
                                         <br/>
                                         <div className="float-right">
                                             <p>added {Math.floor(value.time/60)} mins ago...</p>
                                         </div>

                                     </Card.Text>
                                 </Card.Body>
                             </Card>
                         </Row>
                     )
                 }
                 else{
                     return<div></div>
                 }

             }

         })
     }




    render() {
        const {show,count} = this.state;

        return (

            <div id="main">
                <Container id="Container">
                    < Row className="Content">
                            <p id="heading">WISHLIST</p>

                    </Row>
                    < Row className="Content">
                        <p id="head">{count} JOBS </p>
                    </Row>
                    <Row>
                        <div className="Content">
                            <button className="butt" onClick={this.handleShow} >+</button>
                        </div>
                    </Row>

                    <Modal show={show} onHide={this.handleClose} className="text-center modal-md">
                        <Modal.Header closeButton>
                            <Modal.Title >Add a job</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>

                                    <input className="form-control " id="comp"  type="text" placeholder="Company">
                                       </input>

                                </Row>
                                <br/>
                                <Row>
                                    <input className="form-control" id="pos" type="text"  placeholder="Position"/>
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>

                            <Button size="lg" className="colo" variant="primary" value="Input" onClick={this.handleClose} block>
                                Continue
                            </Button>
                        </Modal.Footer>
                    </Modal>



                    {this.renderObject()}

                </Container>

            </div>
        );
    }

}




