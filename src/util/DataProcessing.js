
/**
*	Removes data according to given filters, including removing players that are not required, 
*	and removing kpis and extraKpis from the remaining players
*
*	@param playersData array	the list of player data objects that has to be filterd
*	@param filters object       contains any filters that need to be applied, in the form of arrays of ids
*	
*	@return array               the filtered players with filtered kpis and extraKpis
**/
export const filterPlayersData = (playersData=[], filters={}) => {
	//console.log('playersData', playersData)
	const reqPlayerIds = filters.reqPlayerIds || [];
	const reqKpis = filters.reqKpis || [];
	const reqExtraKpis = filters.reqExtraKpis || [];
	return playersData
        .filter(pData => reqPlayerIds.includes(pData.id))
        .map(pData =>{
          //filter kpis
          const filteredKpis = pData.kpis ?
            pData.kpis.filter(kpi => reqKpis.includes(kpi.id))
            :[];
          const filteredExtraKpis = pData.kpis ? 
            pData.kpis.filter(kpi => reqExtraKpis.includes(kpi.id))
            :[];
          return{
            ...pData,
            kpis:filteredKpis,
            extraKpis:filteredExtraKpis
          }
        })
}

export const flattenDs = kpis => {
	if(!kpis)
		return [];
	return kpis.map(kpi => kpi.values).reduce((a,b) => [...a, ...b], []);
}
/**
*	@param value   string or number	the id of the player whose values should be returned

*	@return  
**/
const formatValue = value => {
	//todo - may not need to check undefined - it just doesnt return which is same thing
	if(!value)
		return undefined;
	if(typeof value === 'number')
		return value;
	if(typeof value === 'string')
		return Number(value);
}
/**
*   gets an array of values for different sessions for a given player and kpi 
*
*	@param kpis array   the kpi defn objects, each with an id
*	@param data object  contains team object, players array, and sessions_with_kpis array,
*						which is an array of {session:{}, kpis:{}} objects - one per session
*
*   @return  array      - an array of playerData objects, 1 for each player in data.players
*                       - each playerData object contains {id, name, position, kpis}
*                       - each playerData.kpis contains [{...kpi, values}] where values is the 
*                         values for that player and kpi
**/
export const formatChartData = (kpis, data) =>{
	console.log('formatChartData data', data)
	return data.players.map(p =>{
		const playerKpis = kpis.map(kpi =>{
			const values = getPlayerValuesForKpi(p.player_id, kpi.id, data.sessions_with_kpis)
			return{
				...kpi,
				values:values
			}
		})
		return {
			id:p.player_id,
			position:p.position,
			name:p.name,
			kpis:playerKpis
		}
	})
}

/**
*   gets an array of values for different sessions for a given player and kpi 
*
*	@param players array   list of players
*
*   @return  array      - players in alph order, with id, firstName and secondName properties
						- surname is shortened to keep within 12 characters
**/
export const formatPlayers = players =>{
	return players
		.map(player =>{
			//split name into two
			const names = formatStr(player.name).split(' ');
			//2nd name max 12 chars
			const secondNameCut = names[1].slice(0,12)
			const secondName = names[1].length === secondNameCut.length ?
				names[1] : secondNameCut +'...'
			return{
				id:player.player_id || player.id || '',
				firstName:names[0] || '',
				secondName:secondName || '',
				pos:player.position || '',
				photoUrl:player.avatar || '' //???
			}
		})
		.sort((a,b) =>{
			if(a.secondName <= b.secondName)
				return -1;
			return 1;
		})
}

export const formatStr = str =>{
	if(typeof str !== 'string')
		return ''
	return str.replace('&lsquo;', '\'');
}

//note: data comes from server so each player has player_id not id at this stage
//helper
/*
*   gets an array of values for different sessions for a given player and kpi 
*
*	@param playerId         string	the id of the player whose values should be returned
*	@param kpiId            string  the id of the kpi whose value should be returned for each session
*	@param sessionsWithKpis array   1 object per session, each one containing a session object with details,
*									and a kpis object which has all the sessinPlayerKpi objects for that session 
*									ie 1 per player
*                           		ie [{session:{...}, kpis:[{sessionPlayerKpi},{sessionPlayerKpi},...]}]
*
* @return  array   the array of values and session details(from sessions which that player has a kpi value for)
* warning - values may be stored as undefined if some kpis exist and others dont
*/
export const getPlayerValuesForKpi = (playerId, kpiId, sessionsWithKpis) =>{
	return sessionsWithKpis
		.map(sessWithKpis =>{
			//for this session, get the sessionPlayerKpis object for the required player
			const kpiObject = sessWithKpis.kpis.find(kpiObj => kpiObj.player_id === playerId);

			if(!kpiObject || !kpiObject[kpiId]){
				//either no kpi object for this player and session, or there is but no value for this kpi
				return undefined
			}else {
				var dateToUse;
				if(typeof sessWithKpis.session.date !== 'string'){
					dateToUse = sessWithKpis.session.date;
				}else{
					const yearMonthDay = sessWithKpis.session.date.split(' ')[0];
					//console.log('yearMonthDay', yearMonthDay)
					const basicDate = new Date(yearMonthDay)
					basicDate.setHours(0,0,0,0);
					dateToUse = basicDate;
				}
				
				return{
					date: dateToUse,// new Date(sessWithKpis.session.date),
					//dont need sessionId as we have it in id
                    sessionId: kpiObject.session_id,
                    sessionTypeId: sessWithKpis.session.session_type_id,
                    //status: kpiObject.status,
                    title: sessWithKpis.session.title,
                    //uniqueId
                    id:kpiObject.session_id +'-' +playerId +'-'+kpiId,
                    value: formatValue(kpiObject[kpiId])
				}
			}
		})
		.filter(valueWrapper=> valueWrapper !== undefined)
}