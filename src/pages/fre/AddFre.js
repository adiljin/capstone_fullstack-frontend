import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

export default function AddFre() {

    let navigate = useNavigate()


    const [client, setClient] = useState({
        name: "",
        address: "",
        number: "",
        email: "",
        years: "",
        type: ""
    })

    const [selectedClient, setSelectedClient] = useState({
        name: "",
        address: "",
        number: "",
        email: "",
        years: "",
        type: ""
    })

    const [cust, setCust] = useState([])
    const [route, setRoute] = useState([])

    const [selectCust, setselectCust] = useState({
        name: "",
        address: "",
        number: "",
        e_mail: ""
    })

    const [selectRouteFrom, setselectRouteFrom] = useState({
        portName: "",
        priceFrom: "",
    })

    const [freight, setFreight] = useState({
        customer: "",
        ship: "",
        routeF: "",
        routeT: "",
        weight: "",
        price: "",
        routesPrice: ""
    })


    const [freWeight, setWei] = useState({
        weight: ""
    })

    const [frePrice, setfre] = useState({
        price: ""
    })

    const [filteredRoute, setfilteredRoute] = useState([])

    const [selectRouteTo, setselectRouteTo] = useState({
        portName: "",
        priceFrom: "",
    })

    let shiper = "contract"
    let lease

    const [tot, setTot] = useState({
        tprice: "",
        tlea: ""
    })

    const [shi, setShi] = useState({
        shipType: ""
    })

    const { shipType } = shi
    const { tprice, tlea } = tot

    const [cruise, setCruise] = useState([]);
    const [cargo, setCargo] = useState([]);
    const [tugboat, setTugboat] = useState([]);
    const [barge, setBarge] = useState([]);
    const [container, setContainer] = useState([]);
    const [tanker, setTanker] = useState([]);
    useEffect(() => {
        loadClients();
        loadCust();
        loadRoutes();
    }, []);

    const ships = [
        { type: 'cruise', data: cruise, setter: setCruise },
        { type: 'cargo', data: cargo, setter: setCargo },
        { type: 'tugboat', data: tugboat, setter: setTugboat },
        { type: 'barge', data: barge, setter: setBarge },
        { type: 'container', data: container, setter: setContainer },
        { type: 'tanker', data: tanker, setter: setTanker }
    ];

    // const { id } = useParams()

    const loadClients = async () => {
        const promises = ships.map(({ type }) => axios.get(`http://localhost:8080/${type}/${type}s`));
        const responses = await Promise.all(promises);
        responses.forEach(({ data }, index) => {
            const { setter } = ships[index];
            setter(data);
        });
    };

    const loadCust = async () => {
        const result = await axios.get("http://localhost:8080/cust/get");
        setCust(result.data);
    };

    const loadRoutes = async () => {
        const result = await axios.get("http://localhost:8080/rout/routes");
        setRoute(result.data);
    };


    const onSubmit = async (e) => {
        if (freight.customer !== "" && freight.ship !== "" && freight.routeF !== "" && freight.routeT !== "" && freight.fweight !== "" && freight.price !== "") {
            setFreight({ ...freight, fweight: freWeight, price: frePrice});
            console.log(freight)
            e.preventDefault();
            await axios.post(`http://localhost:8080/fre`, freight)
            navigate("/pages/freman")
        } else {
            e.preventDefault();
            alert("Please fill out all fields.");
        }
    }

    // const [selectedClient, setSelectedClient] = useState({null});

    const genRoutesPrice = (list, routeF, routeT) => {
        let result = 0;
        let may = false;
        for (let i = 0; i < list.length; i++) {
            const troute = list[i];
            if (troute.id === routeF.id) {
                may = true;
            } else if (troute.id === routeT.id) {
                result += troute.priceFrom;
                return result;
            }
            if (may) {
                result += troute.priceFrom;
            }
        }
        return result;
    };

    const genPrice = (list, routeF, routeT, weight, price) => {
        let result = 0;
        let may = false;
        for (let i = 0; i < list.length; i++) {
            const troute = list[i];
            if (troute.id === routeF.id) {
                may = true;
            } else if (troute.id === routeT.id) {
                result += troute.priceFrom;
                setFreight({ ...freight, routesPrice: result });
                result += (Number(weight)+Number(price)) * 0.4;
                return result;
            }
            if (may) {
                result += troute.priceFrom;
            }
        }
        return result;
    };

    const onInputChange = (e) => {
        if (e.target.name === "shipper") {
            const selectedClientId = e.target.value;
            const selectedClient = ships.flatMap(({ data }) => data).find(client => client.id == selectedClientId);
            setSelectedClient(selectedClient);
            setFreight({ ...freight, ship: selectedClient });
        } else if (e.target.name === "customer") {
            const custId = e.target.value
            const selectCust = cust.find(cust => cust.id == custId);
            setselectCust(selectCust);
            setFreight({ ...freight, customer: selectCust });
        } else if (e.target.name === "portFrom") {
            const routeId = e.target.value
            const selectRouteFrom = route.find(route => route.id == routeId);
            setFreight({ ...freight, routeF: selectRouteFrom });
            setselectRouteFrom(selectRouteFrom);
            const filteredRoute = route.filter(r => r.id > e.target.value);
            setfilteredRoute(filteredRoute);
        } else if (e.target.name === "portTo") {
            const routeId = e.target.value
            const selectRouteTo = route.find(route => route.id == routeId);
            setselectRouteTo(selectRouteTo);
            setFreight({ ...freight, routeT: selectRouteTo });
        } else if (e.target.name === "weight") {
            if (e.target.value < selectedClient.weightMin || e.target.value > selectedClient.weightMax) {
                // Show error message or alert
                const minWeight = parseInt(selectedClient.weightMin);
                const maxWeight = parseInt(selectedClient.weightMax);
                // alert("Weight must be between " + selectedClient.weightMin + " and " + selectedClient.weightMax);
                // return;
            }
            const price = genPrice(route, selectRouteFrom, selectRouteTo, e.target.value, selectedClient.pricePerYear);
            setfre(price)
            setWei(e.target.value)
            const routesPrices = genRoutesPrice(route, selectRouteFrom, selectRouteTo)
            setFreight({ ...freight, weight: e.target.value, price: frePrice, routesPrice: routesPrices});
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Register Shipping Company</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div>
                            <div className='text-start'>
                                <div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                        {/* Dropdown */}
                                        <div class="btn-group d-grid gap-2 mb-3 text-start" role="group" aria-label="Button group with nested dropdown">
                                            <label htmlFor='ship' className='form-label text-start mb-0'>
                                                Customer name
                                            </label>
                                            <select
                                                className="form-control"
                                                name='customer'
                                                // value={selectedClient ? selectedClient.id : ""}
                                                onChange={onInputChange}
                                            >
                                                <option>Choose customer</option>
                                                {
                                                    cust.map((cust) =>
                                                        <option value={cust.id}>{cust.name}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        {/* Dropdown */}
                                        {/* Dropdown */}
                                        <div class="btn-group d-grid gap-2 mb-3 text-start" role="group" aria-label="Button group with nested dropdown">
                                            <label htmlFor='ship' className='form-label text-start mb-0'>
                                                Shiper name
                                            </label>
                                            <select
                                                className="form-control"
                                                name='shipper'
                                                // value={selectedClient ? selectedClient.id : ""}
                                                onChange={onInputChange}
                                            >
                                                <option>Choose shipper</option>
                                                {ships.map(({ type, data }) => (
                                                    data.map(client => (
                                                        <option value={client.id}>{client.type} - {client.name}</option>
                                                    ))
                                                ))}
                                            </select>
                                        </div>
                                        {/* Dropdown */}
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                        <div className='mb-3 text-start mx-1'>
                                            <label htmlFor='number' className='form-label'>
                                                Ship type
                                            </label>
                                            <input
                                                type={"text"}
                                                className="form-control"
                                                placeholder=""
                                                name="number"
                                                value={selectedClient.type}
                                                onChange={(e) => onInputChange(e)}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3 text-start mx-1'>
                                            <label htmlFor='number' className='form-label'>
                                                Price
                                            </label>
                                            <input
                                                type={"text"}
                                                className="form-control"
                                                placeholder=""
                                                name="number"
                                                value={selectedClient.pricePerYear}
                                                onChange={(e) => onInputChange(e)}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                <div className='mb-3 text-start mx-1'>
                                    <label htmlFor='number' className='form-label'>
                                        Min weight
                                    </label>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        placeholder="Enter phone#"
                                        name="number"
                                        value={selectedClient.weightMin}
                                        onChange={(e) => onInputChange(e)}
                                        readOnly
                                    />
                                </div>
                                <div className='mb-3 text-start'>
                                    <label htmlFor='Email' className='form-label'>
                                        Max weight
                                    </label>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        placeholder="Email"
                                        name="email"
                                        value={selectedClient.weightMax}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                {/* Dropdown */}
                                <div class="btn-group d-grid gap-2 mb-3 text-start" role="group" aria-label="Button group with nested dropdown">
                                    <label htmlFor='ship' className='form-label text-start mb-0'>
                                        Port from
                                    </label>
                                    <select
                                        className="form-control"
                                        name='portFrom'
                                        // value={selectedClient ? selectedClient.id : ""}
                                        onChange={onInputChange}
                                    >
                                        <option>From</option>
                                        {
                                            route.map((route, index) =>
                                                <option value={route.id}>{route.portName}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                {/* Dropdown */}
                                {/* Dropdown */}
                                <div class="btn-group d-grid gap-2 mb-3 text-start" role="group" aria-label="Button group with nested dropdown">
                                    <label htmlFor='ship' className='form-label text-start mb-0'>
                                        Port to
                                    </label>
                                    <select
                                        className="form-control"
                                        name='portTo'
                                        // value={selectedClient ? selectedClient.id : ""}
                                        onChange={onInputChange}
                                    >
                                        <option>To</option>
                                        {
                                            filteredRoute.map((route, index) =>
                                                <option value={route.id}>{route.portName}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                {/* Dropdown */}
                            </div>
                            {/* check */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                <div className='mb-3 text-start mx-1'>
                                    <label htmlFor='years' className='form-label'>
                                        Load weight
                                    </label>
                                    <input
                                        type={"number"}
                                        className="form-control"
                                        placeholder="Type weight"
                                        name="weight"
                                        // value={years}
                                        onChange={(e) => onInputChange(e)}
                                        pattern="[0-9]*"
                                        inputmode="numeric"
                                        min={selectedClient.weightMin}
                                        max={selectedClient.weightMax}
                                    />
                                </div>
                                <div className='mb-3 text-start mx-1'>
                                    <label htmlFor='years' className='form-label'>
                                        Price
                                    </label>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        placeholder="Price"
                                        name="years"
                                        value={frePrice}
                                        onChange={(e) => onInputChange(e)}
                                        pattern="[0-9]*"
                                        inputmode="numeric"
                                        readOnly
                                    />
                                </div>
                            </div>
                            {/* check */}
                        </div>


                        <button type='submit' className='btn btn-outline-success my-3'>Submit</button>
                        <Link type='submit' className='btn btn-outline-danger mx-2' to={'/pages/freman'}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
