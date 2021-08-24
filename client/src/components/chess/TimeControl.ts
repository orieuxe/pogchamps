export const formatTimeControl = (timecontrol: string) => {
	const minSec = timecontrol.split('+').map(Number)
	minSec[0] = minSec[0] / 60
	if (minSec.length < 2) minSec.push(0)
	return minSec.join('+')
}
