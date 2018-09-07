Location
{
    id: #
    size: {w,h} OR null (dynamic),
    items: [],
    getPositon(item) {
        return {x,y};
    }
    getItem(x,y) {
        return items[0];
    }
}

Unit
{
    id: #
    cubits: [Cubit.id],
    slots: #
}

Cubit 
{
    id: #
    cubits: [Cubit.id]
}

GameState
{
    units: [Cubit],
    cubits: [Unit],
    locations: [Location]
}

