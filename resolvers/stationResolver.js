import Station from '../models/station.js';
import Connection from '../models/connection.js';

export default {
    Query: {
        stations: async (parent, args) => {
            try {
                const start = args.start ? parseInt(args.start) : 0;
                const limit = args.limit ? parseInt(args.limit) : 10;

                let res = await Station.find().skip(start).limit(limit);
                return res;
            } catch (e) {
                console.log(`Error while getting stations: ${e.message}`);
            }
        },
        station: async (parent, args) => {
            return Station.findById(args.id);
        },
    },
    Mutation: {
        addStation: async (parent, args) => {
            try {
                const stationData = { ...args };

                const connections = args.Connections;
                const connectionIds = await Promise.all(
                    connections.map(async (con) => {
                        try {
                            const newConnection = new Connection(con);
                            await newConnection.save();
                            return newConnection._id;
                        } catch (e) {
                            console.log(
                                `Error while creating connection ${e.message}`
                            );
                        }
                    })
                );

                const newStation = new Station({
                    ...stationData,
                    Connections: connectionIds,
                });

                newStation.save();
                return newStation;
            } catch (e) {
                console.log(`Error while creating station ${e.message}`);
            }
        },
        modifyStation: async (parents, args) => {
            try {
                const stationId = args.id;
                const connections = args.Connections;
                const stationData = {
                    Title: args.Title,
                };

                const stationUpdateData = await Station.findByIdAndUpdate(
                    stationId,
                    stationData,
                    {
                        new: true,
                    }
                );

                if (connections) {
                    const connectionID = connections[0].id;
                    const connectionData = {
                        Title: connections[0].Title,
                    };
                    try {
                        await Connection.findByIdAndUpdate(connectionID, connectionData, {
                            new: true,
                        });
                    } catch (e) {
                        console.log(
                            `Error while updating connection ${e.message}`
                        );
                    }
                }

                return stationUpdateData.save();
            } catch (e) {
                console.log(`Error while updating station ${e.message}`);
            }
        },
        deleteStation: async (parent, args) => {
            try {
                const id = args.id;
                await Station.findByIdAndDelete(id);
                return id;
            } catch (e) {
                console.log(`Error while deleting station ${e.message}`);
            }
        },
    },
};