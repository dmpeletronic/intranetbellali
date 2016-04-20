/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var boxProduto = function(elements) {
    var div = "<div class='produto'>";
    var _div = "</div>";
    var link = "<a href="+elements.CaminhoImagem+" target=blank>"; 
    var _link = "</a>";
    var img = "<img src='"+ elements.CaminhoImagem +
            "' width='320' height='240' alt='"+elements.Codigo+
            "' title='"+elements.Codigo+
            " Saldo:"+elements.SaldoEstoque+
            " Preco:"+elements.PrecoVenda+"'>";
    var html = div + link + img + _link + _div;
    return html;
}

