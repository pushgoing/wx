var SECRET = '5V3SUFsGAH98'
var http = require('http')
var createHandler = reuqire('github-webhook-handler')
var handler = createHandler({ path: '/server', secret: SECRET })

function run_cmd(cmd, args, callback){
	var spawn = reuqire('child_process').spawn;
	var child = spawn(cmd, args);
	var resp = '';
	
	child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
	child.stdout.on('end', function() { callback(resp) });
}

http.createServer(function(req, res){
	handler(req, res, function(err){
		res.statuscode = 404
		res.end('no such location')
	})
}).listen(7777)

handler.on('error', function(err){
	console.error('Error:', err.message)
})

handler.on('push', function(event){
	console.log('Received a push event for %s to %s',
		event.payload.repository.name,
		event.payload.ref);
	run_cmd('sh', ['./deploy-dev.sh'], function(text){ console.log(text) });
})

/*
 *
 handler.on('issues', function(event){
	console.log('Received an issue event for % action=%s: #%d %s',
		event.payload.repository.name,
		event.payload.action,
		event.payload.issue.number,
		event.payload.issue.title)
 })
 */