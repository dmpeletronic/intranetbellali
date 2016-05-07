/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var getDBLink = function () {
    var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1XQhBPx-YLj9Dtr9J1Hh_E3J0_J7x03CZkajdOhSeinY/pubhtml';
    return public_spreadsheet_url;
};

function converteMoedaFloat(valor){ 
  if(valor === ""){
    valor =  0;
  }else{
    valor = valor.replace("R","");
    valor = valor.replace("$","");
    valor = valor.replace(".","");
    valor = valor.replace(",",".");
    valor = parseFloat(valor);
  }
  return valor;
};

var buscaProduto = function (data, codigo) {
  var i;
  for(i=0; i<data.elements.length; i++) {
    if(codigo==data.elements[i].Codigo) {
    break;
    } 
  }
  if(i==data.elements.length) {
    return null;
  } 
  return data.elements[i];
};

var boxProdutoSimples = function(elements) {
    var div = "<div class='produto' style='width:320;'>";
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
};
var boxProduto = function(elements) {
    var div = "<div class='produto'>";
    var _div = "</div>";
    var table = "<table  border=1 width=500> <tbody>";
    var _table = "</tbody> </table>";
    var link = "<a href="+elements.CaminhoImagem+" target=blank>"; 
    var _link = "</a>";
    var row = "<tr>";
    var _row = "</tr>";
    var col1 = "<td rowspan=4 width=320>";
    var col = "<td>";
    var col2 = "<td class=col2>";
    var _col = "</td>";
    var img = "<img src='"+ elements.CaminhoImagem +
            "'  alt='"+elements.Codigo+
            "' title='"+elements.Codigo+
            " Saldo:"+elements.SaldoEstoque+
            " Preco:"+elements.PrecoVenda+"'>";
    var html = div + table +
            row + 
              col1 + link + img + _link + _col +
              col2 + "Codigo:" + _col +
              col + elements.Codigo + _col +
            _row+
            row+
            col2 + "Preco:" + _col +
            col + elements.PrecoVenda + _col +
            _row+
            row+
            col2 + "Qtde:" + _col +
            col + elements.SaldoEstoque + _col +
            _row+
            row+
            col2 + "Descricao:" + _col +
            col + elements.Descricao + _col+
            _row +
            _table + _div;
    return html;    
};

var totalVendas = function (data) {
  var total_valor = 0;
  for(var i=0; i< data.Vendas.elements.length; i++) {
    var produto = buscaProduto(data.Produtos, data.Vendas.elements[i].CodigoProduto);
     if (produto==null) {
      continue;
    }            
    var valor = converteMoedaFloat(data.Vendas.elements[i].ValorTotal);
    total_valor += valor;
  }
  return total_valor.toFixed(2);
};

var totalCustoMercadoriaVendida = function (data) {
  var cmv = 0;
  for(var i=0; i< data.Vendas.elements.length; i++) {
     var produto = buscaProduto(data.Compras, data.Vendas.elements[i].CodigoProduto);
     var qtde = parseInt(data.Vendas.elements[i].Quantidade);
     cmv += qtde*converteMoedaFloat(produto.ValorPago);
  }
  return cmv.toFixed(2);
};

var totalEmEstoque = function (data) {
  var total = 0;
  for(var i=0; i < data.Produtos.elements.length; i++) {
    var qtde = parseInt(data.Produtos.elements[i].SaldoEstoque);
    var prc_unit = converteMoedaFloat(data.Produtos.elements[i].PrecoVenda);
    total += qtde*prc_unit;
  }
  return total.toFixed(2);
};

totalComissoes = function (data) {
  var total = 0;
  for(var i=0; i< data.Vendas.elements.length; i++) {           
    var valor = converteMoedaFloat(data.Vendas.elements[i].Comissao);
    total += valor;
  }
  return total.toFixed(2);
};
