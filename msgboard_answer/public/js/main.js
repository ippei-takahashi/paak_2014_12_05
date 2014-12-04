$(document).ready(function() {
	$.ajax({ // 非同期通信でデータを取得
		url: "/fetchmsg", // /fetchmsgのURLからデータを取得
		success: function(json) {
			var i, data;
			for (i = 0; i < json.length; i++) {
				data = json[i];
				$("#messages")
					.append($("<li />").addClass("list-group-item")
						.append($("<p />").text(data.name))
						.append($("<p />").text(data.body))
				);
			}
		}
	});
})