<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta charset="ISO-8859-1">
<body>

	<h1>Welcome!</h1>	
	<hr> 
	<h3>Your Tasks:</h3>

	<table>
		<thead>
			<tr>
				<th>ID</th>
				<th>Title</th>
				<th>Target Date</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach items="${tasks}" var="task">
				<tr>
					<td>${task.id}</td>
					<td>${task.title}</td>
					<td>${task.targetDate}</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>

</body>
</html>